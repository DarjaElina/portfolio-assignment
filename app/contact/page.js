"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(
        "https://portfolio-app.lndo.site/jsonapi/contact_message/general_inquiry",
        {
          data: {
            type: "contact_message--contact_message",
            attributes: {
              subject: "Website Contact Form",
              name: name,
              mail: email,
              message: message,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );

      setStatus("Thank you! Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-5">
      <Card className="w-full max-w-lg p-6">
        <CardHeader className="text-3xl font-bold text-primary mb-4">
          Contact Me
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label className="text-xl font-bold mb-4" htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <Label className="text-xl font-bold mb-4" htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <Label className="text-xl font-bold mb-4" htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                required
                rows={5}
              />
            </div>
            <Button type="submit" className="mt-2">
              Send Message
            </Button>
          </form>
          {status && (
            <p className="mt-4 text-green-500 font-medium">{status}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
