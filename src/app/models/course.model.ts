/**
 * List row from the TMS API.
 */
export interface Course {
  id: number;
  code: string;
  title: string;
  maxCapacity: number;
  enrollmentCount: number;
  status?: string;
}

/**
 * Envelope for GET /api/v2/courses.
 */
export interface PagedResponse<T> {
items: T[];
totalCount: number;
page: number;
pageSize: number;
totalPages: number;
hasPrevious: boolean;
hasNext: boolean;
}
/**
 * Pagination information from the API.
 */
export interface CoursePagination {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

/**
 * Hypermedia links from GET /api/v2/courses.
 */
export interface CourseLinks {
  self: string;
  next: string | null;
  prev: string | null;
  enroll: string;
}

/**
 * One link from a course detail response.
 */
export interface CourseLink {
  href: string;
  rel: string;
  method: string;
}

/**
 * Detail payload.
 */
export interface CourseDetail extends Course {
  links: readonly CourseLink[];
}