const AccessControl = require("accesscontrol");
const accessControl = new AccessControl();

const roles = (function () {
    accessControl.grant("basic").readOwn("profile").updateOwn("profile");
    accessControl.grant("admin").extend("basic").readAny("profile").updateAny("profile");
    return accessControl;
})();

const grantAccess = function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.auth.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   }

module.exports.roles = roles;
module.exports.grantAccess = grantAccess;

