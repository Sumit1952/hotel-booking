import User from "../models/User.js"
import { Webhook } from "svix"

const clerkWebhooks = async (req, res) => {
    try {
        const secret = process.env.CLERK_WEBHOOKS_SECRET;
        const whook = new Webhook(secret);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Convert raw buffer body to string for verification
        await whook.verify(JSON.stringify(req.body), headers)

        // Parse event data from JSON payload
        const { data, type } = req.body;

        // Safe extraction of user properties
        

        switch (type) {
            case "user.created": {
                const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url
        };
                await User.create(userData);
                break;
            }
            case "user.updated": {
                const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url
        };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({ success: true, message: "Webhook Received" });

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export default clerkWebhooks;


