"use server";

import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_API_SECRET!
);

interface MailjetListResponse {
  Data: { SubscriberCount: number }[];
}

interface MailjetContactResponse {
  body: {
    Data: {
      ID: number;
    }[];
  };
}

export async function getSubscriberCount() {
  if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_CONTACT_LIST_ID) {
    console.log(
      "Mailjet API key or Contact List ID not found, returning null count."
    );
    return null;
  }
  try {
    const result = await mailjet
      .get("contactslist", { version: "v3" })
      .id(process.env.MAILJET_CONTACT_LIST_ID!)
      .request();

    const body = result.body as unknown as MailjetListResponse;
    const count = body.Data[0].SubscriberCount;
    return new Intl.NumberFormat("en-US").format(count);
  } catch (error) {
    console.error("Failed to get subscriber count:", error);
    return null;
  }
}

export async function addSubscriber(prevState: any, formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { message: "Please enter a valid email.", success: false };
  }

  if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_CONTACT_LIST_ID) {
    return { message: "Server configuration error.", success: false };
  }

  try {
    // Add contact to Mailjet
    const response = (await mailjet.post("contact", { version: "v3" }).request({
      Email: email,
      IsExcludedFromCampaigns: false,
      Name: "Subscriber",
    })) as MailjetContactResponse;

    // Add contact to a specific list
    if (response.body?.Data?.[0]?.ID) {
      await mailjet.post("listrecipient", { version: "v3" }).request({
        ContactID: response.body.Data[0].ID,
        ListID: process.env.MAILJET_CONTACT_LIST_ID,
        IsUnsubscribed: false,
      });
    } else {
      // If Mailjet doesn't return a contact ID, something went wrong.
      throw new Error("Mailjet did not return a contact ID.");
    }

    return { message: "Thank you for subscribing!", success: true };
  } catch (error: any) {
    // It's possible the user is already on the list, which can cause an error.
    // We'll treat this as a success case for a better user experience.
    if (error.statusCode === 400) {
      return {
        message: "You are already subscribed. Thank you!",
        success: true,
      };
    }

    console.error("Mailjet Error:", error);
    return {
      message: "There was an error subscribing. Please try again.",
      success: false,
    };
  }
}
