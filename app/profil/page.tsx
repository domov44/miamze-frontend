'use client';

import { useAuth } from '../contexts/authContext';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return (
            <div className="p-6">
                <Skeleton className="h-40 w-full rounded-xl" />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                <p>Vous devez être connecté pour voir votre profil.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <Card className="md:col-span-1 rounded-2xl shadow-lg">
                <CardHeader className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{user.name} {user.surname}</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div>
                        <span className="font-medium text-foreground">Email: </span>
                        {user.email}
                    </div>
                    <div>
                        <span className="font-medium text-foreground">ID: </span>
                        {user.id}
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Status: </span>
                        <Badge variant="default">Active</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Right Column - Dashboard Info */}
            <Card className="md:col-span-2 rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                    <CardDescription>
                        Détails supplémentaires liés à votre compte.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
