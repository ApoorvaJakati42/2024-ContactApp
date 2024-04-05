const sgMail = require('@sendgrid/mail')
const sendGridApiKey = "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"
const amqp = require('amqplib');
const rabbitmq_url = 'amqps://pbndzsge:bwas20XZnUPkJ6WBf_BvwCVhYrnFoJUI@puffin.rmq2.cloudamqp.com/pbndzsge';
const queueName = 'email_queue';


sgMail.setApiKey(sendGridApiKey)

const sendWelcomeEmail = () => {
    // Connect to RabbitMQ and process incoming emails
amqp.connect(rabbitmq_url)
.then(async (connection) => {
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  console.log(' [*] Waiting for messages. To exit, press Ctrl+C');
  
  channel.consume(queueName, (msg) => {
    const emailData = JSON.parse(msg.content.toString());

    // Send email using SendGrid
    const msgToSend = {
      to: emailData.to,
      from: 'apoorva.jakati.udemy@gmail.com',
      subject: emailData.subject,
      text: emailData.text,
    };

    sgMail.send(msgToSend)
      .then(() => {
        console.log(` [x] Email sent successfully to ${emailData.to}`);
        channel.ack(msg); // Acknowledge the message
      })
      .catch((error) => {
        console.error(' [x] Error sending email:', error);
        channel.reject(msg, false); // Reject the message (requeue = false)
      });
  }, { noAck: false });
})
.catch((error) => console.error('Error connecting to RabbitMQ:', error));
}

module.exports = {
    sendWelcomeEmail
}