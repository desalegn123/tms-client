import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const roleGuard = (requiredRole: string): CanActivateFn => {
return () => {
const auth = inject(AuthService);
const router = inject(Router);
if (auth.hasRole(requiredRole)) {
return true;
}
return router.createUrlTree(["/unauthorized"]);
};
};
