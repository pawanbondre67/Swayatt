export interface User {
  username ?: string;
  email : string;
  password: string;
  role ?: "Manager" | "Operator ";
  department ?: "Assembly" | "Quality Control";
}
