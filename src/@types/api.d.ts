type ArticEvent = {
  id: string;
  api_link: string;
  title: string;
  image_url: string;
  hero_caption: string;
  short_description: string;
  header_description: string;
  list_description: string;
  description: string;
  location: string;
  slug: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  date_display: string;
  rsvp_link: string;
  buy_button_text: string;
  buy_button_caption: string;
  is_registration_required: boolean;
  is_member_exclusive: boolean;
  is_sold_out: boolean;
  is_free: boolean;
  is_private: boolean;
  is_admission_required: boolean;
  is_after_hours: boolean;
  is_virtual_event: boolean;
  virtual_event_url: string;
  virtual_event_passcode: string;
};

type Events = {
  pagination: any;
  data: ArticEvent[];
  info: any;
  config: any;
};
