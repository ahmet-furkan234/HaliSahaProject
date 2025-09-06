import { AuthController } from "./controllers/AuthController.js";
import { AuthService } from "./services/auth.service.js";
import { Container } from "inversify";
import { FacilityController } from "./controllers/FacilityController.js";
import { FacilityService } from "./services/facility.service.js";
import { FeatureController } from "./controllers/FeatureController.js";
import { FeatureService } from "./services/feature.service.js";
import { IAuthService } from "./services/auth-service.interface.js";
import { IFacilityService } from "./services/facility-service.interface.js";
import { IFeatureService } from "./services/feature-service.interface.js";
import { IJwtService } from "./services/jwt-service.interface.js";
import type { IPitchService } from "./services/pitch-service.interface.js";
import type { IRoleService } from "./services/role-service.interface.js";
import { IUserService } from "./services/user-service.interface.js";
import { JwtService } from "./services/jwt.service.js";
import { PitchController } from "./controllers/PitchController.js";
import { PitchService } from "./services/pitch.service.js";
import { RoleController } from "./controllers/RoleController.js";
import RoleService from "./services/role.service.js";
import TYPES from "./types.js";
import { UserController } from "./controllers/UserController.js";
import UserService from "./services/user.service.js";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IRoleService>(TYPES.IRoleService).to(RoleService);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IFeatureService>(TYPES.IFeatureService).to(FeatureService);
container.bind<IFacilityService>(TYPES.IFacilityService).to(FacilityService);
container.bind<IPitchService>(TYPES.IPitchService).to(PitchService);
container.bind<IJwtService>(TYPES.IJwtService).to(JwtService)
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<RoleController>(TYPES.RoleController).to(RoleController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<FeatureController>(TYPES.FeatureController).to(FeatureController);
container.bind<FacilityController>(TYPES.FacilityController).to(FacilityController);
container.bind<PitchController>(TYPES.PitchController).to(PitchController);
export default container;
