import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { products } = await req.json();
  const bearerToken = await getShipBearerToken();
  console.log(bearerToken);
  const orderid = uuidv4().toString();
  const dealer_info = {
    order_id: orderid,
    order_date: getOrderDateTime(),
    pickup_location: "41/24, Anna Street, Anupparpalayam, Tirupur",
    channel_id: "3878430",
    comment: "Reseller: M/s Rajeswari",
  };
  const billing_customer_data = {
    billing_customer_name: "Mohan Prasath S",
    billing_last_name: "Prasath S",
    billing_address: "41/24, Anna Street, Anupparpalayam, Tirupur",
    billing_city: "Tirupur",
    billing_address_2: "41/24, Anna Street, Anupparpalayam, Tirupur",
    billing_pincode: "641652",
    billing_state: "Tamil Nadu",
    billing_country: "India",
    billing_email: "s.mohanprasath19478@gmail.com",
    billing_phone: "9025802851",
  };
  const shipping_customer_data = {
    shipping_customer_name: "Mohan Prasath S",
    shipping_last_name: "Prasath S",
    shipping_address: "41/24, Anna Street, Anupparpalayam, Tirupur",
    shipping_city: "Tirupur",
    shipping_address_2: "41/24, Anna Street, Anupparpalayam, Tirupur",
    shipping_pincode: "641652",
    shipping_state: "Tamil Nadu",
    shipping_country: "India",
    shipping_email: "s.mohanprasath19478@gmail.com",
    shipping_phone: "9025802851",
  };
  const orderItems = products?.map((product) => ({
    name: product.name,
    sku: "PRODUCT_85u38",
    units: product.quantity,
    hsn: 441122,
    selling_price: product.discountPrice,
    discount: "",
    tax: "",
  }));
  const requestData = {
    ...dealer_info,
    ...billing_customer_data,
    ...shipping_customer_data,
    order_items: orderItems,
    shipping_is_billing: true,
    payment_method: "Prepaid",
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: 9000,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 1,
  };
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    return NextResponse.json({ response: response.data }, { status: 200 }); // Change status to 200
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
async function getShipBearerToken() {
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: "s.mohanprasath19478@gmail.com",
        password: "8060Moh@",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = response.data.token;
    return token;
  } catch (error) {
    throw new Error("Failed to retrieve bearer token: " + error.message);
  }
}
function getOrderDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}
