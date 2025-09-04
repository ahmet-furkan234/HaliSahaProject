const TYPES = {
    IUserService: Symbol.for("IUserService"),
    IRoleService: Symbol.for("IRoleService"),
    IAuthService: Symbol.for("IAuthService"),
    IJwtService: Symbol.for("IJwtService"),
    IFeatureService: Symbol.for("IFeatureService"),
    IFacilityService: Symbol.for("IFacilityService"),
    UserController: Symbol.for("UserController"),
    RoleController: Symbol.for("RoleController"),
    AuthController: Symbol.for("AuthController"),
    FeatureController: Symbol.for("FeatureController"),
    FacilityController: Symbol.for("FacilityController"),
};

export default TYPES;