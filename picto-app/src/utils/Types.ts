export interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  type: string;
  content?: string;
  url_text?: string;
  sceneId?: string;
  cssClass?: string;
  meta?: Record<string, unknown>; // optional metadata for custom cases
}

export interface HotspotInstance extends HotspotData {
  createTooltipFunc?: (hotSpotDiv: HTMLElement) => void;
  clickHandlerFunc?: (event: MouseEvent, args: HotspotData) => void;
  clickHandlerArgs?: HotspotData;
}

// -------------- Message banner -------------------

export type MessageBannerRef = {
  trigger: (message: string,type?:MessageBannerType, duration?: number,id?:number) => void;
};

export type MessageBannerType = "success" | "warning" | "failure"


//--------------- Activity types ----------------

type ActivityData = {
    id:string,
    title:string,
    tags:string[],
    description:string,
    tasks:TaskData[],
    type:string,
    authoriseEdit:boolean;
    participantsList:ParticipantData[],
    teamsList:TeamInstance[]
}

export interface ActivityIstance extends ActivityData{
    tagInput:string,
    taskInput:string,
    supervised_teams:boolean,
    chrono:{isEnabled:boolean,minutes:number,seconds:number}
}

export type ActivityStatus ={
    status : "created" | "open" | "closed";
}

export interface FetchedActivity {
  _id: string;
  title: string;
  description?: string;
  createdBy: {
    _id: string;
    firebaseUid: string;
    email: string;
    displayName?: string;
    photoUrl?: string;
  };
  teams: {
    _id: string;
    teamId: string;
    teamName: string;
    supervisorId: string;
    participantsList: {
      participantId: string;
      name: string;
      joinLink: string;
    }[];
  }[];
  ownership: "creator" | "supervisor";
  totalParticipants: number;
  createdAt: string;
}


export type TeamsData = {
    id:string;
    name:string;
    participantsNumber:number;
    supervised:boolean;
    participantsNames:ParticipantData[];
    supervisor_id? : string;
}

export interface TeamInstance extends TeamsData{
    setTeamName? : (id:number,input:string) => void
    addParticipants? : (id:number,numberToAdd:number) => void
}

export type TaskData = {
    id:string,
    title:string,
}

export type ParticipantData ={
    id:string;
    name:string;
}


// File exportation
export type ExportDestination = "drive" |"disk";

export type ExportFormat = "picto" | "raw";

//---------------- Hotsports -------------------------

export interface EditorRef {
  submit: () => void;
}

export interface HotspotEvent {
  type: string;
  coords: [number, number];
}


//------------- GOOGLE Drive ----------------//
export type DriveAuthStatus = {
  isAuthenticated: boolean;
  provider: 'google' | null;
  scopes?: string[];
  connectedAt?: string; // ISO
  reason?: 'revoked' | 'expired' | 'manual_disconnect' | 'login' | 'refresh';
};
  
export interface PannellumViewer {
    mouseEventToCoords: (event: MouseEvent) => [number, number];
    destroy: () => void;
    getYaw: () => number;
    getPitch: () => number;
    getHfov: () => number;
    on: (event: string, handler: () => void) => void;
    removeHotSpot: (id: string) => void;
    addHotSpot: (config: unknown) => void;
}

export interface ViewerConfig {
    type: string;
    panorama: string | null;
    autoLoad: boolean;
    autoRotate: number;
    showControls: boolean;
    // ... etc
}
