import {
  type ContactField,
  type ContactFormData,
} from "@/types/contact-types";

export const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export const REQUIRED_FIELDS: ContactField[] = ["name", "email", "message"];

export const ALERT_DURATION = 5000;

export const CONTACT_SUCCESS_MESSAGE =
  "Message sent. I'll reply as soon as possible.";
export const CONTACT_ERROR_MESSAGE =
  "Something went wrong, please try again.";
