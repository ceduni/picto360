import { HotspotData } from "@/components/HotspotManager";

 class GoogleDriveService {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string = 'http://localhost:5000' ) {
    this.baseUrl = baseUrl;
  }

  
  // Get OAuth URL from backend
  async getAuthUrl(viewerId: string, returnTo: string): Promise<string> {

    try {
      const response = await fetch(`${this.baseUrl}/api/drive/auth-url`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ returnTo,viewerId }),        
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get auth URL');
      }

      return data.authUrl as string;
    } catch (error) {
      throw new Error(`Failed to get auth URL: ${error}`);
    }
  }

  // Handle OAuth callback (exchange code for token)
  async handleAuthCallback(code: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/drive/auth/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      this.accessToken = data.accessToken;
      
      // Store token in localStorage for persistence
      localStorage.setItem('googleDriveToken', data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem('googleDriveRefreshToken', data.refreshToken);
      }

    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }

  // Load token from storage
  loadStoredToken(): boolean {
    const token = localStorage.getItem('googleDriveToken');
    if (token) {
      this.accessToken = token;
      return true;
    }
    return false;
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // Export to Google Drive via backend
  async exportToGoogleDrive(
    imageBlob: Blob,
    annotations: HotspotData[],
    options: {
      imageName?: string;
      folderName?: string;
      includeMetadata?: boolean;
    } = {}
  ): Promise<any> {
    try {

      console.log("Blob:" , imageBlob)

      const formData = new FormData();
      formData.append("file", new File([imageBlob], options.imageName || "panorama.jpg", 
                      { type: imageBlob.type || "image/jpeg" }));
      formData.append('annotations', JSON.stringify(annotations));
      
      if (options.imageName) {
        formData.append('imageName', options.imageName);
      }
      if (options.folderName) {
        formData.append('folderName', options.folderName);
      }
      formData.append('includeMetadata', String(options.includeMetadata ?? true));

      console.log("Request Body: ", JSON.stringify(formData));

      const response = await fetch(`${this.baseUrl}/api/drive/export`, {
        method: 'POST',
        body: formData,
        credentials:"include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Export failed');
      }
      return result;

    } catch (error) {
      throw new Error(`Export failed: ${error}`);
    }
  }

  // Sign out
  signOut(): void {
    this.accessToken = null;
    localStorage.removeItem('googleDriveToken');
    localStorage.removeItem('googleDriveRefreshToken');
  }
}

let googleDriveServ : GoogleDriveService | null;
export const getGoogleDriveService = () =>{
  if(googleDriveServ===null || googleDriveServ===undefined){
    googleDriveServ = new GoogleDriveService();
  }
  return googleDriveServ;
} 