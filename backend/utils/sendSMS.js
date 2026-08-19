
import dotenv from "dotenv";
dotenv.config();

import twilio from "twilio";

// twilio() throws when the account SID is missing or malformed. Building the
// client at module scope meant an unset TWILIO_SID crashed the whole serverless
// function on import, not just SMS. Construct it on first use instead.
let client = null;

const getClient = () => {
    if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN) {
        throw new Error(
            "Twilio is not configured — set TWILIO_SID and TWILIO_AUTH_TOKEN"
        );
    }

    if (!client) {
        client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    return client;
};

const sendSMS = async (phone, otp) => {
    await getClient().messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: phone
    });
};

export default sendSMS;
