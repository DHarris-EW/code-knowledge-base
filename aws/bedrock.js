import {
	BedrockRuntimeClient,
	InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
	region: process.env.AWS_REGION,
});

export async function sendToBedrock(prompt) {
	// https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-titan-text.html
	// SDK auto converts body into Unit8Array
	// You could do 'new TextEncoder().encode(JSON.stringify({...})})'
	try {
		const command = new InvokeModelCommand({
			modelId: "amazon.titan-text-lite-v1",
			contentType: "application/json", //sending json
			accept: "application/json", //expect json
			body: JSON.stringify({
				inputText: prompt,
				textGenerationConfig: {
					maxTokenCount: 50,
					temperature: 0.7, // Creativity of output
					topP: 1, // Control diversity of predictions
				},
			}),
		});

		const response = await client.send(command);
		const textResponse = JSON.parse(new TextDecoder().decode(response.body)); //decode Unit8Arry response from BedrockRuntimeClient
		return textResponse.results[0].outputText;
	} catch (err) {
		console.error("Bedrock error:", JSON.stringify(err));
		throw new Error("Bedrock request failed");
	}
}
