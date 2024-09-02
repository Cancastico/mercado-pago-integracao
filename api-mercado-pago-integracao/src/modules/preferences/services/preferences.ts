import MercadoPagoConfig, { Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";


export default class PreferenceService {
  private client;
  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }
  
  create(items: Items[], payer: { email: string, name?: string, surname?: string, identificationType: string, identificationNumber: string }) {
    const preference: PreferenceCreateData = {
      body: {
        items: items.map((item, index) => ({
          id: index.toString(),
          title: item.title,
          unit_price: item.unit_price,
          quantity: item.quantity,
        })),
        additional_info: `Um incentivo ao desenvolvedor avelino, tipos de incentivo: ${items.map(item => item.title)}`,
        payer: {
          email: payer.email,
          name: payer.name,
          surname: payer.surname,
          identification: {
            type: payer.identificationType,
            number: payer.identificationNumber,
          },
        },
        back_urls: {
          success: 'https://www.your-site.com/success',
          failure: 'https://www.your-site.com/failure',
          pending: 'https://www.your-site.com/pending',
        },
        auto_return: 'approved',
      }
    };

    const preferenceClient = new Preference(this.client);
    return preferenceClient.create(preference);
  }

  get(preferenceId: string) {
    const preference = new Preference(this.client);

    return preference.get({ preferenceId });
  }

  search() {
    const preference = new Preference(this.client);

    return preference.search();
  }

  // update(preferenceId: number) {
  //   const preference = new Preference(this.client);

  //   return preference.update({preferenceId });
  // }
}