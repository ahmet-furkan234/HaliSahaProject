const TYPES = {
    IUserService: Symbol.for("IUserService"),
    IRoleService: Symbol.for("IRoleService"),
    IAuthService: Symbol.for("IAuthService"),
    IJwtService: Symbol.for("IJwtService"),
    IFeatureService: Symbol.for("IFeatureService"),
    IFacilityService: Symbol.for("IFacilityService"),
    IPitchService: Symbol.for("IPitchService"),
    UserController: Symbol.for("UserController"),
    RoleController: Symbol.for("RoleController"),
    AuthController: Symbol.for("AuthController"),
    FeatureController: Symbol.for("FeatureController"),
    FacilityController: Symbol.for("FacilityController"),
    PitchController: Symbol.for("PitchController"),
};
export default TYPES;