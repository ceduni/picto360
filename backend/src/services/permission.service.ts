import { ProjectDocument } from "@/models/project.model";
import { UserDocument } from "@/models/user.model";
import Permission, { PermissionAction } from "@/models/user_perm.model";

/**
 * Object Level Permission Service
 */
class OLPermissionService{

  async verifyUserPermForProject(
    user: UserDocument,
    project: ProjectDocument,
    requiredActions: PermissionAction[]
  ) {
    return Boolean(
      await Permission.exists({
        subjectType: "USER",
        subjectId: user._id,
        objectType: "PictoProject",
        objectId: project._id,
        actions: { $all: requiredActions },
      })
    );
  }
        
}

export default new OLPermissionService()