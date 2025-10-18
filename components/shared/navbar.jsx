"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-background border-b border-border px-5 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="text-primary font-bold text-xl">Daria</div>

      <div className="hidden md:flex gap-6">
        <Link href="/" className="text-foreground hover:text-primary transition">
          Home
        </Link>
        <Link href="/about" className="text-foreground hover:text-primary transition">
          About
        </Link>
        <Link href="/projects" className="text-foreground hover:text-primary transition">
          Projects
        </Link>
        <Link href="/contact" className="text-foreground hover:text-primary transition">
          Contact
        </Link>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden">Menu</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-5">
          <ScrollArea className="h-full space-y-4">
            <Link href="/" className="block text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/projects" className="block text-foreground hover:text-primary transition">
              Projects
            </Link>
            <Link href="/contact" className="block text-foreground hover:text-primary transition">
              Contact
            </Link>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
