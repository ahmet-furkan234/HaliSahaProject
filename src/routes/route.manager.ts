import { Application } from "express";
import AuthRoutes from "./auth.routes.js";
import FacilityRoutes from "./facility.route.js";
import { FeatureRoutes } from "./feature.routes.js";
import PitchRoutes from "./pitch.routes.js";
import RoleRoutes from "./role.routes.js";
import UserRoutes from "./user.routes.js";

export class RouteManager {
    private authRoutes: AuthRoutes;
    private userRoutes: UserRoutes;
    private roleRoutes: RoleRoutes;
    private featureRoutes: FeatureRoutes;
    private facilityRoutes: FacilityRoutes;
    private pitchRoutes: PitchRoutes;


    constructor(app: Application) {
        this.authRoutes = new AuthRoutes();
        this.userRoutes = new UserRoutes();
        this.roleRoutes = new RoleRoutes();
        this.featureRoutes = new FeatureRoutes();
        this.facilityRoutes = new FacilityRoutes();
        this.pitchRoutes = new PitchRoutes();
        this.initializeRoutes(app);
    }

    private initializeRoutes(app: Application): void {
        app.use("/auth", this.authRoutes.router);
        app.use("/users", this.userRoutes.router);
        app.use("/roles", this.roleRoutes.router);
        app.use("/features", this.featureRoutes.router);
        app.use("/facilities", this.facilityRoutes.router);
        app.use("/pitches", this.pitchRoutes.router);
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

    public getfacilityRoutes(): FacilityRoutes {
        return this.facilityRoutes;
    }

    public getPitchRoutes(): PitchRoutes {
        return this.pitchRoutes;
    }
}

export default RouteManager;
