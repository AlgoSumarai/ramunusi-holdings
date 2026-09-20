export const company = {
  name: 'Ramunusi Holdings',
  phone: '',
  whatsapp: '', // International digits only, without + or spaces.
  email: '',
  serviceArea: '',
  hours: '',
  website: 'https://ramunusi-holdings.vercel.app',
};
export const whatsappUrl = company.whatsapp
  ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hi Ramunusi Holdings, I would like to enquire about your electrical services.')}`
  : null;
