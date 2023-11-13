export type LemonSqueezyResponse = {
    data: Data;
    meta: Meta;
}

export type Data = {
    id:            string;
    type:          string;
    links:         DataLinks;
    attributes:    Attributes;
    relationships: Relationships;
}

export type Attributes = {
    urls:                    Urls;
    pause:                   null;
    status:                  string;
    ends_at:                 null;
    order_id:                number;
    store_id:                number;
    cancelled:               boolean;
    renews_at:               Date;
    test_mode:               boolean;
    user_name:               string;
    card_brand:              string;
    created_at:              Date;
    product_id:              number;
    updated_at:              Date;
    user_email:              string;
    variant_id:              number;
    customer_id:             number;
    product_name:            string;
    variant_name:            string;
    order_item_id:           number;
    trial_ends_at:           null;
    billing_anchor:          number;
    card_last_four:          string;
    status_formatted:        string;
    first_subscription_item: FirstSubscriptionItem;
}

export type FirstSubscriptionItem = {
    id:              number;
    price_id:        number;
    quantity:        number;
    created_at:      Date;
    updated_at:      Date;
    is_usage_based:  boolean;
    subscription_id: number;
}

export type Urls = {
    update_payment_method: string;
}

export type DataLinks = {
    self: string;
}

export type Relationships = {
    order:                   Customer;
    store:                   Customer;
    product:                 Customer;
    variant:                 Customer;
    customer:                Customer;
    "order-item":            Customer;
    "subscription-items":    Customer;
    "subscription-invoices": Customer;
}

export type Customer = {
    links: CustomerLinks;
}

export type CustomerLinks = {
    self:    string;
    related: string;
}

export type Meta = {
    test_mode:  boolean;
    event_name: string;
}