// Test multiple RabbitMQ connection options for RabbitMQ 4.x compatibility
const amqp = require('amqplib');

async function testConnectionOptions() {
    console.log('Testing RabbitMQ 4.x compatibility options...\n');

    const testCases = [
        {
            name: "Standard options with frameMax 8192",
            uri: 'amqp://admin:password123@localhost:5672',
            options: {
                frameMax: 8192,
                heartbeat: 60,
                connection_timeout: 10000
            }
        },
        {
            name: "RabbitMQ 4.x recommended settings",
            uri: 'amqp://admin:password123@localhost:5672',
            options: {
                frameMax: 131072,  // Larger frame size
                heartbeat: 0,      // Disable heartbeat initially
                connection_timeout: 30000,
                channelMax: 0,     // No channel limit
                vhost: '/'         // Explicit vhost
            }
        },
        {
            name: "Minimal options",
            uri: 'amqp://admin:password123@localhost:5672',
            options: {
                frameMax: 8192,
                heartbeat: 0
            }
        },
        {
            name: "Guest user test",
            uri: 'amqp://guest:guest@localhost:5672',
            options: {
                frameMax: 8192,
                heartbeat: 0
            }
        },
        {
            name: "Default amqplib options (no custom options)",
            uri: 'amqp://admin:password123@localhost:5672',
            options: {}
        }
    ];

    for (const testCase of testCases) {
        console.log(`--- Testing: ${testCase.name} ---`);
        console.log(`URI: ${testCase.uri}`);
        console.log(`Options:`, JSON.stringify(testCase.options, null, 2));

        try {
            const connection = await amqp.connect(testCase.uri, testCase.options);
            console.log('✅ SUCCESS! Connected successfully');

            try {
                const channel = await connection.createChannel();
                console.log('✅ Channel created');
                await channel.close();
            } catch (channelErr) {
                console.log('⚠️  Connection OK, but channel failed:', channelErr.message);
            }

            await connection.close();
            console.log('✅ Connection closed gracefully\n');

            console.log(`🎉 WORKING SOLUTION FOUND: ${testCase.name}\n`);
            return testCase; // Return the working configuration

        } catch (error) {
            console.log('❌ Failed:', error.message);
            if (error.code) console.log('   Error code:', error.code);
            console.log('');
        }
    }

    console.log('❌ All connection attempts failed');
    return null;
}

testConnectionOptions();