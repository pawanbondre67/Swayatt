import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loginUser } from "@/hooks/slices/Auth/authSlice";
import { User } from "@/hooks/services/AuthService/type";
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {

    const dispatch = useAppDispatch();
    const { status ,error} = useAppSelector((state) => state.auth);
 const navigate = useNavigate();
  // State for form fields
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
    role : undefined,
    department: undefined,
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle form submission
// Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch the registerUser action
      console.log("Registering user" , formData);
      await dispatch(loginUser(formData)).unwrap();

      // Show success toast
      console.log("Login successful");

      navigate('/');


      // Reset the form
    //   handleReset();
    } catch (err) {
      // Show error toast
        console.log("Login failed err" , err);
        console.log("Login failed" , error);
    }
  };


  // Handle form reset
  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      role: undefined,
      department: undefined,
    });
  };

  return (
    <Card className="w-full max-w-[350px] mx-auto sm:w-[400px] md:w-[450px] lg:w-[500px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to get Started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
         
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Role and Department */}
            <div className="flex flex-row justify-between space-y-1.5">
              {/* Role */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Assembly">Assembly</SelectItem>
                    <SelectItem value="Quality Control">Quality Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Submit'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;