import RecipeCard from "@/components/recipe-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-8 p-2 pt-10 w-full max-w-5xl">
      <div className="flex flex-col gap-10">
        <Card className="w-full overflow-hidden shadow-lg">
          <div className="flex flex-col justify-center p-4 pb-2">
            <div className="flex gap-1 items-center">
              <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardDescription className="text-sm text-gray-500">
                Bonjour <span className="font-medium">Ronan</span>👋
              </CardDescription>
            </div>
            <CardTitle className="text-lg font-semibold">
              On cuisine quoi aujourd&apos;hui?
            </CardTitle>
          </div>
          <CardFooter className="flex gap-2 p-4 pt-2">
            <Button className="text-sm">
              Ajouter une recette
            </Button>
            <Button variant="outline" className="text-sm">
              Gérer mes recettes
            </Button>
          </CardFooter>
        </Card>
        <Tabs defaultValue="explorer" className="w-full">
          <TabsList className="flex justify-start gap-4 p-2">
            <TabsTrigger value="explorer" className="text-sm font-medium">
              Explorer
            </TabsTrigger>
            <TabsTrigger value="pour-vous" className="text-sm font-medium">
              Pour vous
            </TabsTrigger>
          </TabsList>
          <TabsContent value="explorer">
            <div className="grid grid-cols-1 gap-8 p-2">
              <RecipeCard
                imageSrc="https://recipesappea0631f8364f439bb0004d59ea016d09234552-production.s3.eu-west-3.amazonaws.com/public/images/recipes/1731324644265-couscous.jpeg?x-amz-content-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXYKJSITNZTVR2IVR%2F20250125%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20250125T215453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCWV1LXdlc3QtMyJHMEUCIAW9ISCdsyjczzqkaXiv2WPI%2FNCOwq0%2FHtTFcjTMucQaAiEAp0EWsQV5LRk3fB7tZ1eXQ4gyYVLxVDPV4JoJlWFCcG8qyQUINxAAGgw1MzMyNjcxMDQ5ODciDCW6HiTvvIFntnIjsCqmBQ%2FyAyGBpRezJrBLT7SlqxRNhZpBdafM4O7twIL4dmRK15P28EoPhKr2B%2F2MyZrPZFDg%2BKe8uS6dFbcz7au88PR6HWlMQ8ynym6LJSBVC0mAgsE2S8pQ%2FonFBD7weEPDvyIB9%2BGoAnT1Ji9dD%2FdFJKfTdmg%2FKm6l5cFtVDcvpT5pYiTMFY%2FGRzj2KEWdXTyO0P8gfK3uZdAGXrMuaM0n4kc6YCVafSBbXXjDKhc762CyixvOcLsLvH47kGQhDtOdbCWaRAIkbxtEtxPuIAmFy9%2BbDRf5BY2aqy3Bdlr9lBFEDuTi4L4IkQrP3isAJMwbnPHXKAchkgySmhjlS%2B9YgAZZimK2w5gA1jCKINuxtIzHxffVRbzrxx5M0PzMysuKeMheETjlN76hGBqjn4Pa%2B4MlEyuxUoaX2Q08RXfbEaEb4ToYPGBZkQ9%2BlT%2BHGDLh1Nosdd8FJ7Ye%2BG1AGrSIIW3h2IYBhTbtrASExYUIQ0sbbcgbg8%2F%2FJFcLXVIY6jZIMl953o2lm7F4eDaL%2Bov%2BMQ%2FtlEO3Y5%2Bx3yqSQAFXoBJ8o%2BOUj4EGp7jtD9RtrKvxYCx1JYfMxby%2FMAu9eF3P6yliyBcPV8XF5%2B4VX%2BKlkqoN1EMrZRu4DqNUWXeyFc5VKRZ3Q%2FgSvNRcS%2FAyV04yne1%2BNWvruEZ2gb6dRsLj1AYo7%2Bq8LWdYFD%2F6OUzYWlR%2BeRhjhi33Ye4Vf0wwUilCSyKxOqNWnJukocYswEo5RmsVQ0w%2Fgwoku8YlbryEN4FVpPOvWAR5QKv7QRVapC9NZGFVWyR50gCs7cvQLsBRIxxpRm6I30iPgnqpu%2B%2BqSvp29urfafukb%2FbfuACF1UAQ2rg2VXnutC%2FaayA5eO%2Fg3cpIJ7zZZLs%2B6sU9eNWGEWb6G0ZklUyp1jCtu9W8BjrdAhLkG4OnFqhBishsJ%2B62q2NvIPT7lPrsPfUMQe0uWci2SpdUU%2FkRvszAxMM1i5jVvkL4C%2BmbE4TSygx9Z1FmJc95TqH7x9Ep6mhJA%2BLNGLnkj4hvrv5LnJ9Kijkt5jNEdgg%2BEMTRbb9ZgkjVcNBOs%2FgKGqGLSpt3C3P45yxWRUDxzpZzeSKbfkh2FRSSYFmFNg58pqpJeafUlz7IlEeVm2ifdV4EXDyWoY2jLu55uZ8p6AbPf%2FnDKTqMDV5%2BIMRLK8PDj9JAgSS4EfRomRIyZJHC3lhHQiENgTcGESKOmtZe0%2B3CjhwQnLbExJkxvyyzcbRDf7UHF31bgWr8aNdpsxYt%2FNUoxepQUKQtLMk7U4FtMUWKRaaIympUQN1o9fMFTLh88sNVoCkjzdklbfzbb9T%2FP5RzWqMHpbqihmT27aOy0uvDpRoebbA%2FmbFaTHJrbdpp8Tf9TKMDuRBUhNY%3D&X-Amz-Signature=d5ae1f21edd32846ad0a98c89c51e8c82480a6876e1c3f7b13d9f22bdb91b66c"
                imageAlt="Couscous"
                prepTime="45min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Couscous: Une Recette Facile et Délicieuse"
                username="Utilisateur1"
                views="1,2M"
                postedAgo="3 jours"
              />
              <RecipeCard
                imageSrc="https://recipesappea0631f8364f439bb0004d59ea016d09234552-production.s3.eu-west-3.amazonaws.com/public/images/recipes/1731324644265-couscous.jpeg?x-amz-content-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXYKJSITNZTVR2IVR%2F20250125%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20250125T215453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCWV1LXdlc3QtMyJHMEUCIAW9ISCdsyjczzqkaXiv2WPI%2FNCOwq0%2FHtTFcjTMucQaAiEAp0EWsQV5LRk3fB7tZ1eXQ4gyYVLxVDPV4JoJlWFCcG8qyQUINxAAGgw1MzMyNjcxMDQ5ODciDCW6HiTvvIFntnIjsCqmBQ%2FyAyGBpRezJrBLT7SlqxRNhZpBdafM4O7twIL4dmRK15P28EoPhKr2B%2F2MyZrPZFDg%2BKe8uS6dFbcz7au88PR6HWlMQ8ynym6LJSBVC0mAgsE2S8pQ%2FonFBD7weEPDvyIB9%2BGoAnT1Ji9dD%2FdFJKfTdmg%2FKm6l5cFtVDcvpT5pYiTMFY%2FGRzj2KEWdXTyO0P8gfK3uZdAGXrMuaM0n4kc6YCVafSBbXXjDKhc762CyixvOcLsLvH47kGQhDtOdbCWaRAIkbxtEtxPuIAmFy9%2BbDRf5BY2aqy3Bdlr9lBFEDuTi4L4IkQrP3isAJMwbnPHXKAchkgySmhjlS%2B9YgAZZimK2w5gA1jCKINuxtIzHxffVRbzrxx5M0PzMysuKeMheETjlN76hGBqjn4Pa%2B4MlEyuxUoaX2Q08RXfbEaEb4ToYPGBZkQ9%2BlT%2BHGDLh1Nosdd8FJ7Ye%2BG1AGrSIIW3h2IYBhTbtrASExYUIQ0sbbcgbg8%2F%2FJFcLXVIY6jZIMl953o2lm7F4eDaL%2Bov%2BMQ%2FtlEO3Y5%2Bx3yqSQAFXoBJ8o%2BOUj4EGp7jtD9RtrKvxYCx1JYfMxby%2FMAu9eF3P6yliyBcPV8XF5%2B4VX%2BKlkqoN1EMrZRu4DqNUWXeyFc5VKRZ3Q%2FgSvNRcS%2FAyV04yne1%2BNWvruEZ2gb6dRsLj1AYo7%2Bq8LWdYFD%2F6OUzYWlR%2BeRhjhi33Ye4Vf0wwUilCSyKxOqNWnJukocYswEo5RmsVQ0w%2Fgwoku8YlbryEN4FVpPOvWAR5QKv7QRVapC9NZGFVWyR50gCs7cvQLsBRIxxpRm6I30iPgnqpu%2B%2BqSvp29urfafukb%2FbfuACF1UAQ2rg2VXnutC%2FaayA5eO%2Fg3cpIJ7zZZLs%2B6sU9eNWGEWb6G0ZklUyp1jCtu9W8BjrdAhLkG4OnFqhBishsJ%2B62q2NvIPT7lPrsPfUMQe0uWci2SpdUU%2FkRvszAxMM1i5jVvkL4C%2BmbE4TSygx9Z1FmJc95TqH7x9Ep6mhJA%2BLNGLnkj4hvrv5LnJ9Kijkt5jNEdgg%2BEMTRbb9ZgkjVcNBOs%2FgKGqGLSpt3C3P45yxWRUDxzpZzeSKbfkh2FRSSYFmFNg58pqpJeafUlz7IlEeVm2ifdV4EXDyWoY2jLu55uZ8p6AbPf%2FnDKTqMDV5%2BIMRLK8PDj9JAgSS4EfRomRIyZJHC3lhHQiENgTcGESKOmtZe0%2B3CjhwQnLbExJkxvyyzcbRDf7UHF31bgWr8aNdpsxYt%2FNUoxepQUKQtLMk7U4FtMUWKRaaIympUQN1o9fMFTLh88sNVoCkjzdklbfzbb9T%2FP5RzWqMHpbqihmT27aOy0uvDpRoebbA%2FmbFaTHJrbdpp8Tf9TKMDuRBUhNY%3D&X-Amz-Signature=d5ae1f21edd32846ad0a98c89c51e8c82480a6876e1c3f7b13d9f22bdb91b66c"
                imageAlt="Crumble"
                prepTime="30min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Crumble aux Pommes"
                username="Utilisateur2"
                views="500K"
                postedAgo="2 jours"
              />
            </div>
          </TabsContent>
          <TabsContent value="pour-vous">
            <div className="grid grid-cols-1 gap-8 p-2">
              <RecipeCard
                imageSrc="https://recipesappea0631f8364f439bb0004d59ea016d09234552-production.s3.eu-west-3.amazonaws.com/public/images/recipes/1731324644265-couscous.jpeg?x-amz-content-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXYKJSITNZTVR2IVR%2F20250125%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20250125T215453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCWV1LXdlc3QtMyJHMEUCIAW9ISCdsyjczzqkaXiv2WPI%2FNCOwq0%2FHtTFcjTMucQaAiEAp0EWsQV5LRk3fB7tZ1eXQ4gyYVLxVDPV4JoJlWFCcG8qyQUINxAAGgw1MzMyNjcxMDQ5ODciDCW6HiTvvIFntnIjsCqmBQ%2FyAyGBpRezJrBLT7SlqxRNhZpBdafM4O7twIL4dmRK15P28EoPhKr2B%2F2MyZrPZFDg%2BKe8uS6dFbcz7au88PR6HWlMQ8ynym6LJSBVC0mAgsE2S8pQ%2FonFBD7weEPDvyIB9%2BGoAnT1Ji9dD%2FdFJKfTdmg%2FKm6l5cFtVDcvpT5pYiTMFY%2FGRzj2KEWdXTyO0P8gfK3uZdAGXrMuaM0n4kc6YCVafSBbXXjDKhc762CyixvOcLsLvH47kGQhDtOdbCWaRAIkbxtEtxPuIAmFy9%2BbDRf5BY2aqy3Bdlr9lBFEDuTi4L4IkQrP3isAJMwbnPHXKAchkgySmhjlS%2B9YgAZZimK2w5gA1jCKINuxtIzHxffVRbzrxx5M0PzMysuKeMheETjlN76hGBqjn4Pa%2B4MlEyuxUoaX2Q08RXfbEaEb4ToYPGBZkQ9%2BlT%2BHGDLh1Nosdd8FJ7Ye%2BG1AGrSIIW3h2IYBhTbtrASExYUIQ0sbbcgbg8%2F%2FJFcLXVIY6jZIMl953o2lm7F4eDaL%2Bov%2BMQ%2FtlEO3Y5%2Bx3yqSQAFXoBJ8o%2BOUj4EGp7jtD9RtrKvxYCx1JYfMxby%2FMAu9eF3P6yliyBcPV8XF5%2B4VX%2BKlkqoN1EMrZRu4DqNUWXeyFc5VKRZ3Q%2FgSvNRcS%2FAyV04yne1%2BNWvruEZ2gb6dRsLj1AYo7%2Bq8LWdYFD%2F6OUzYWlR%2BeRhjhi33Ye4Vf0wwUilCSyKxOqNWnJukocYswEo5RmsVQ0w%2Fgwoku8YlbryEN4FVpPOvWAR5QKv7QRVapC9NZGFVWyR50gCs7cvQLsBRIxxpRm6I30iPgnqpu%2B%2BqSvp29urfafukb%2FbfuACF1UAQ2rg2VXnutC%2FaayA5eO%2Fg3cpIJ7zZZLs%2B6sU9eNWGEWb6G0ZklUyp1jCtu9W8BjrdAhLkG4OnFqhBishsJ%2B62q2NvIPT7lPrsPfUMQe0uWci2SpdUU%2FkRvszAxMM1i5jVvkL4C%2BmbE4TSygx9Z1FmJc95TqH7x9Ep6mhJA%2BLNGLnkj4hvrv5LnJ9Kijkt5jNEdgg%2BEMTRbb9ZgkjVcNBOs%2FgKGqGLSpt3C3P45yxWRUDxzpZzeSKbfkh2FRSSYFmFNg58pqpJeafUlz7IlEeVm2ifdV4EXDyWoY2jLu55uZ8p6AbPf%2FnDKTqMDV5%2BIMRLK8PDj9JAgSS4EfRomRIyZJHC3lhHQiENgTcGESKOmtZe0%2B3CjhwQnLbExJkxvyyzcbRDf7UHF31bgWr8aNdpsxYt%2FNUoxepQUKQtLMk7U4FtMUWKRaaIympUQN1o9fMFTLh88sNVoCkjzdklbfzbb9T%2FP5RzWqMHpbqihmT27aOy0uvDpRoebbA%2FmbFaTHJrbdpp8Tf9TKMDuRBUhNY%3D&X-Amz-Signature=d5ae1f21edd32846ad0a98c89c51e8c82480a6876e1c3f7b13d9f22bdb91b66c"
                imageAlt="Recette"
                prepTime="15min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Recette Rapide"
                username="Utilisateur3"
                views="1M"
                postedAgo="1 jour"
              />
              <RecipeCard
                imageSrc="https://recipesappea0631f8364f439bb0004d59ea016d09234552-production.s3.eu-west-3.amazonaws.com/public/images/recipes/1731324644265-couscous.jpeg?x-amz-content-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXYKJSITNZTVR2IVR%2F20250125%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20250125T215453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCWV1LXdlc3QtMyJHMEUCIAW9ISCdsyjczzqkaXiv2WPI%2FNCOwq0%2FHtTFcjTMucQaAiEAp0EWsQV5LRk3fB7tZ1eXQ4gyYVLxVDPV4JoJlWFCcG8qyQUINxAAGgw1MzMyNjcxMDQ5ODciDCW6HiTvvIFntnIjsCqmBQ%2FyAyGBpRezJrBLT7SlqxRNhZpBdafM4O7twIL4dmRK15P28EoPhKr2B%2F2MyZrPZFDg%2BKe8uS6dFbcz7au88PR6HWlMQ8ynym6LJSBVC0mAgsE2S8pQ%2FonFBD7weEPDvyIB9%2BGoAnT1Ji9dD%2FdFJKfTdmg%2FKm6l5cFtVDcvpT5pYiTMFY%2FGRzj2KEWdXTyO0P8gfK3uZdAGXrMuaM0n4kc6YCVafSBbXXjDKhc762CyixvOcLsLvH47kGQhDtOdbCWaRAIkbxtEtxPuIAmFy9%2BbDRf5BY2aqy3Bdlr9lBFEDuTi4L4IkQrP3isAJMwbnPHXKAchkgySmhjlS%2B9YgAZZimK2w5gA1jCKINuxtIzHxffVRbzrxx5M0PzMysuKeMheETjlN76hGBqjn4Pa%2B4MlEyuxUoaX2Q08RXfbEaEb4ToYPGBZkQ9%2BlT%2BHGDLh1Nosdd8FJ7Ye%2BG1AGrSIIW3h2IYBhTbtrASExYUIQ0sbbcgbg8%2F%2FJFcLXVIY6jZIMl953o2lm7F4eDaL%2Bov%2BMQ%2FtlEO3Y5%2Bx3yqSQAFXoBJ8o%2BOUj4EGp7jtD9RtrKvxYCx1JYfMxby%2FMAu9eF3P6yliyBcPV8XF5%2B4VX%2BKlkqoN1EMrZRu4DqNUWXeyFc5VKRZ3Q%2FgSvNRcS%2FAyV04yne1%2BNWvruEZ2gb6dRsLj1AYo7%2Bq8LWdYFD%2F6OUzYWlR%2BeRhjhi33Ye4Vf0wwUilCSyKxOqNWnJukocYswEo5RmsVQ0w%2Fgwoku8YlbryEN4FVpPOvWAR5QKv7QRVapC9NZGFVWyR50gCs7cvQLsBRIxxpRm6I30iPgnqpu%2B%2BqSvp29urfafukb%2FbfuACF1UAQ2rg2VXnutC%2FaayA5eO%2Fg3cpIJ7zZZLs%2B6sU9eNWGEWb6G0ZklUyp1jCtu9W8BjrdAhLkG4OnFqhBishsJ%2B62q2NvIPT7lPrsPfUMQe0uWci2SpdUU%2FkRvszAxMM1i5jVvkL4C%2BmbE4TSygx9Z1FmJc95TqH7x9Ep6mhJA%2BLNGLnkj4hvrv5LnJ9Kijkt5jNEdgg%2BEMTRbb9ZgkjVcNBOs%2FgKGqGLSpt3C3P45yxWRUDxzpZzeSKbfkh2FRSSYFmFNg58pqpJeafUlz7IlEeVm2ifdV4EXDyWoY2jLu55uZ8p6AbPf%2FnDKTqMDV5%2BIMRLK8PDj9JAgSS4EfRomRIyZJHC3lhHQiENgTcGESKOmtZe0%2B3CjhwQnLbExJkxvyyzcbRDf7UHF31bgWr8aNdpsxYt%2FNUoxepQUKQtLMk7U4FtMUWKRaaIympUQN1o9fMFTLh88sNVoCkjzdklbfzbb9T%2FP5RzWqMHpbqihmT27aOy0uvDpRoebbA%2FmbFaTHJrbdpp8Tf9TKMDuRBUhNY%3D&X-Amz-Signature=d5ae1f21edd32846ad0a98c89c51e8c82480a6876e1c3f7b13d9f22bdb91b66c"
                imageAlt="Dessert"
                prepTime="20min"
                avatarSrc="https://github.com/shadcn.png"
                avatarAlt="CN"
                title="Délicieux Dessert"
                username="Utilisateur4"
                views="750K"
                postedAgo="5 heures"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <div className="flex flex-col gap-8 sticky top-4">
          <Card className="w-full overflow-hidden shadow-lg">
            <CardContent className="p-4 flex gap-4">
              <div className="flex flex-col justify-center w-full">
                <CardTitle className="text-lg font-semibold">
                  Tendances et Catégories
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Découvrez les dernières tendances culinaires et explorez des recettes populaires!
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #Tendances
                  </Button>
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #RecettesVégétariennes
                  </Button>
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #RecettesRapides
                  </Button>
                  <Button variant="outline" className="text-xs text-gray-600 border-gray-300">
                    #CuisineDuMonde
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full overflow-hidden shadow-lg">
            <CardContent className="p-4 flex gap-4">
              <div className="flex flex-col justify-center w-full">
                <CardTitle className="text-lg font-semibold">
                  Cuisto que vous pourriez aimer
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Explorez des profils qui pourraient vous inspirer!
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Utilisateur1</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Utilisateur2</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Utilisateur3</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

