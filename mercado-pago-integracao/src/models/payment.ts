interface PaymentData {
    accounts_info: null;
    acquirer_reconciliation: any[];
    additional_info: {
      authentication_code: null;
      available_balance: null;
      nsu_processadora: null;
    };
    authorization_code: null;
    binary_mode: boolean;
    brand_id: null | string;
    build_version: string;
    call_for_authorize_id: null;
    callback_url: null | string;
    captured: boolean;
    card: Record<string, any>;
    charges_details: {
      accounts: {
        from: string;
        to: string;
      };
      amounts: {
        original: number;
        refunded: number;
      };
      client_id: number;
      date_created: string;
      id: string;
      last_updated: string;
      metadata: {
        source: string;
      };
      name: string;
      refund_charges: any[];
      reserve_id: null | string;
      type: string;
    }[];
    collector_id: number;
    corporation_id: null | string;
    counter_currency: null | string;
    coupon_amount: number;
    currency_id: string;
    date_approved: null | string;
    date_created: string;
    date_last_updated: string;
    date_of_expiration: string;
    deduction_schema: null | string;
    description: null | string;
    differential_pricing_id: null | string;
    external_reference: null | string;
    fee_details: any[];
    financing_group: null | string;
    id: number;
    installments: number;
    integrator_id: null | string;
    issuer_id: string;
    live_mode: boolean;
    marketplace_owner: null | string;
    merchant_account_id: null | string;
    merchant_number: null | string;
    metadata: Record<string, any>;
    money_release_date: null | string;
    money_release_schema: null | string;
    money_release_status: string;
    notification_url: null | string;
    operation_type: string;
    order: Record<string, any>;
    payer: {
      email: null | string;
      entity_type: null | string;
      first_name: null | string;
      id: string;
      identification: {
        number: null | string;
        type: null | string;
      };
      last_name: null | string;
      phone: {
        area_code: null | string;
        extension: null | string;
        number: null | string;
      };
      type: null | string;
    };
    payment_method: {
      id: string;
      issuer_id: string;
      type: string;
    };
    payment_method_id: string;
    payment_type_id: string;
    platform_id: null | string;
    point_of_interaction: {
      application_data: {
        name: null | string;
        version: null | string;
      };
      business_info: {
        branch: null | string;
        sub_unit: string;
        unit: string;
      };
      location: {
        source: null | string;
        state_id: null | string;
      };
      transaction_data: {
        bank_info: {
          collector: {
            account_holder_name: string;
            account_id: null | string;
            long_name: null | string;
            transfer_account_id: null | string;
          };
          is_same_bank_account_owner: null | boolean;
          origin_bank_id: null | string;
          origin_wallet_id: null | string;
          payer: {
            account_holder_name: null | string;
            account_id: null | string;
            external_account_id: null | string;
            id: null | string;
            identification: {
              number: null | string;
              type: null | string;
            };
            long_name: null | string;
          };
        };
        bank_transfer_id: null | string;
        e2e_id: null | string;
        financial_institution: null | string;
        qr_code: string;
        qr_code_base64: string;
      };
    };
    pos_id:null | string,
    processing_mode:string,
    status:string,
    status_detail:string,
  }
  