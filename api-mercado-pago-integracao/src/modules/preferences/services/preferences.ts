import MercadoPagoConfig, { Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { uuid } from "uuidv4";

export default class PreferenceService {
  private client: MercadoPagoConfig;

  constructor(accessToken: string) {
    // Verificar se o token de acesso está presente
    if (!accessToken) {
      throw new Error("O token de acesso é necessário para inicializar o cliente do Mercado Pago.");
    }

    this.client = new MercadoPagoConfig({ accessToken });
  }

  // Criar uma nova preferência
  create(items: Items[]) {
    // Verificar se os itens foram fornecidos
    if (!items || items.length === 0) {
      throw new Error("Ao menos um item deve ser fornecido para criar uma preferência.");
    }

    const preference: PreferenceCreateData = {
      body: {
        items: items.map((item, index) => ({
          id: index.toString(),
          title: item.title,
          unit_price: item.unit_price,
          quantity: item.quantity,
          currency_id: "BRL" // Adicionar a moeda, importante para garantir que o valor seja em reais.
        })),

        additional_info: `Um incentivo ao desenvolvedor Avelino, tipos de incentivo: ${items.map(item => item.title).join(", ")}`,
      },
    };

    const preferenceClient = new Preference(this.client);
    return preferenceClient.create(preference);
  }

  // Obter uma preferência pelo ID
  get(preferenceId: string) {
    if (!preferenceId) {
      throw new Error("O ID da preferência deve ser fornecido.");
    }

    const preference = new Preference(this.client);
    return preference.get({ preferenceId });
  }

  // Buscar todas as preferências
  search() {
    const preference = new Preference(this.client);
    return preference.search();
  }
}
