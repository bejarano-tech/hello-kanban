"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CardWrapperHeader } from '@/components/auth/header';
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
} : CardWrapperProps) => {

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardWrapperHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel}/>       
      </CardFooter>
    </Card>
  )

}