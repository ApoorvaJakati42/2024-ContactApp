const twilio = require('twilio');
const amqp = require('amqplib');

const accountSid = 'AC546fdc47116fe29eb91011a99708e597';
const authToken = '6b0708fd77306f46539b0d6cfc54d95d';
const client = twilio(accountSid, authToken);

const rabbitmq_url = 'amqps://pbndzsge:bwas20XZnUPkJ6WBf_BvwCVhYrnFoJUI@puffin.rmq2.cloudamqp.com/pbndzsge';
const queueName = 'mobile_text_queue';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const otpMap = new Map();

const generateAndSendOtp = async () => {
  try {
    const connection = await amqp.connect(rabbitmq_url);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });

    console.log(' [*] Waiting for messages. To exit, press Ctrl+C');

    return new Promise((resolve, reject) => {
      channel.consume(queueName, async (msg) => {
        const phoneNumber = JSON.parse(msg.content.toString());
        
        const otp = generateOTP();
        otpMap.set(phoneNumber, otp);

        try {
          await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: '+19382532379',
            to: `+91${phoneNumber}`
          });

          console.log("Otp sent successfully using RabittMQ");
          channel.ack(msg); // Acknowledge the message
          resolve("success");
        } catch (error) {
          console.log("Otp sending failed", error);
          channel.reject(msg, false); // Reject the message (requeue = false)
          reject("error");
        }
      }, { noAck: false });
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    return Promise.reject("error");
  }
};

const verifyOTP = (phoneNumber , OTP) => {
  // Implement OTP verification logic here
  const storedOTP = otpMap.get(phoneNumber);
  if (storedOTP && OTP === storedOTP.toString()) {
    return "success"
  } else {
    return "failure"
  }
};

module.exports = {
  generateAndSendOtp,
  verifyOTP
};
