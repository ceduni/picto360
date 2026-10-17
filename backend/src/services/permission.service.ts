import { PlaygroundDocument } from "@/models/pictoPlayground.model";
import { UserDocument } from "@/models/user.model";
import Permission, { PermissionAction } from "@/models/user_perm.model";

/**
 * Object Level Permission Service
 * Handles assigning new permissions, verifying and validating permissions
 * and revoking permisssions on objects
 */

class OLPermissionService{

  async verifyUserPermForProject(
    user: UserDocument,
    project: PlaygroundDocument,
    requiredActions: PermissionAction[]
  ) {
    return Boolean(
      await Permission.exists({
        subjectType: "USER",
        subjectId: user._id,
        objectType: "PictoPlayground",
        objectId: project._id,
        actions: { $all: requiredActions },
      })
    );
  }

}

export default new OLPermissionService()