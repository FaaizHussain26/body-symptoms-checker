import type React from "react";

import { useState } from "react";
import {
  useSymptoms,
  type UserDemographics,
} from "@/contexts/symptoms-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Calendar, Users, Mail, Phone } from "lucide-react";

export const DemographicsForm: React.FC<{}> = () => {
  const { dispatch } = useSymptoms();
  const [formData, setFormData] = useState<UserDemographics>({
    name: undefined,
    age: null,
    sex: "other",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.age && formData.sex) {
      dispatch({
        type: "SET_DEMOGRAPHICS",
        payload: {
          name: formData.name || undefined,
          age: formData.age,
          sex: formData.sex as "male" | "female" | "other",
          email: formData.email || undefined,
          phone: formData.phone || undefined,
        },
      });
    }
  };

  const isValid =
    formData.age && formData.sex && formData.age > 0 && formData.age < 120;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">
            Welcome to Sleep Apnea Risk Assessment
          </CardTitle>
          <CardDescription>
            Please provide some basic information to get personalized sleep
            apnea risk assessment and treatment recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name (Optional)
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                min="1"
                max="120"
                value={formData.age || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    age: Number(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Sex *
              </Label>
              <RadioGroup
                value={formData.sex}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    sex: value as "male" | "female" | "other",
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid}>
              Continue to Sleep Apnea Symptoms Checklist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
