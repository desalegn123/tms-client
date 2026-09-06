import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpInterceptorFn } from "@angular/common/http";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
const auth = inject(AuthService);
const token = auth.getAccessToken();
if (token) {
const cloned = req.clone({
setHeaders: { Authorization: `Bearer ${token}` }
});
return next(cloned);
}
return next(req);
};