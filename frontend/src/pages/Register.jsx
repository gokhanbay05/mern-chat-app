import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import useAuthStore from "../store/auth.store";
import { registerSchema } from "../validation/auth.schemas";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Register() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await api.post("/api/auth/register", values);
      setUser(res.data.user);
      toast.success("Welcome! Your account has been created.");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Enter your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, isSubmitting }) => (
              <Form className="grid gap-4">
                <div className="relative grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john_doe"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="absolute right-0 top-full mt-1 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-md px-2 py-1 shadow-sm"
                  />
                </div>
                <div className="relative grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="example@mail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="absolute right-0 top-full mt-1 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-md px-2 py-1 shadow-sm"
                  />
                </div>
                <div className="relative grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="absolute right-0 top-full mt-1 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-md px-2 py-1 shadow-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-5 w-full hover:cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Create Account"}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="mt-5 text-center text-sm ">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
