import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";


export interface GradePayload {
studentId: number;
courseId: number;
score: number;
}
@Service()
export class GradeService {
private http = inject(HttpClient);
postGrade(payload: GradePayload): Observable<{ id: string; success: boolean }> {
return this.http.post<{ id: string; success: boolean }>('/api/grades', payload);
}
}

function Service(): (target: typeof GradeService) => void | typeof GradeService {
  throw new Error("Function not implemented.");
}
