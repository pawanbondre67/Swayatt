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
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { registerUser } from "@/redux/slices/Auth/authSlice";
import { User } from "@/redux/services/AuthService/type";

const Register: React.FC = () => {

    const dispatch = useAppDispatch();
    const {UserData} = useAppSelector((state) => state.auth);

  // State for form fields
  const [formData, setFormData] = useState<User>({
    username: "",
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
      await dispatch(registerUser(formData)).unwrap();

      // Show success toast
      console.log("Registration successful");

      // Reset the form
    //   handleReset();
    } catch (err) {
      // Show error toast
        console.log("Registration failed err" , err);
        console.log("Registration failed" , UserData.error);
    }
  };


  // Handle form reset
  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: undefined,
      department: undefined,
    });
  };

  return (
    <Card className="w-full max-w-[350px] mx-auto sm:w-[400px] md:w-[450px] lg:w-[500px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register to get Started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            {/* Username */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

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
        <Button type="submit" onClick={handleSubmit} disabled={UserData.status === 'loading'}>
          {UserData.status === 'loading' ? 'Registering...' : 'Register'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;