import { Application } from "express";
import AuthRoutes from "./auth.routes.js";
import { FeatureRoutes } from "./feature.routes.js";
import RoleRoutes from "./role.routes.js";
import UserRoutes from "./user.routes.js";

export class RouteManager {
    private authRoutes: AuthRoutes;
    private userRoutes: UserRoutes;
    private roleRoutes: RoleRoutes;
    private featureRoutes: FeatureRoutes;
    constructor(app: Application) {
        this.authRoutes = new AuthRoutes();
        this.userRoutes = new UserRoutes();
        this.roleRoutes = new RoleRoutes();
        this.featureRoutes = new FeatureRoutes();
        this.initializeRoutes(app);
    }

    private initializeRoutes(app: Application): void {
        app.use("/auth", this.authRoutes.router);
        app.use("/users", this.userRoutes.router);
        app.use("/roles", this.roleRoutes.router);
        app.use("/features", this.featureRoutes.router);
    }

    public getAuthRoutes(): AuthRoutes {
        return this.authRoutes;
    }

    public getUserRoutes(): UserRoutes {
        return this.userRoutes;
    }

    public getRoleRoutes(): RoleRoutes {
        return this.roleRoutes;
    }

    public getFeatureRoutes(): FeatureRoutes {
        return this.featureRoutes;
    }
}

export default RouteManager;
