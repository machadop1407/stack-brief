import { getSubscriberCount } from "@/app/actions";
import HomeClient from "./home-client";

export default async function HomePage() {
  const subscriberCount = await getSubscriberCount();

  return <HomeClient subscriberCount={subscriberCount} />;
}
