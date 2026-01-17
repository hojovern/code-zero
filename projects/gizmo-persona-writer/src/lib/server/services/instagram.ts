import { env } from '$env/dynamic/private';

export async function postToInstagram(imageUrl: string, caption: string, instagramUserId: string, accessToken: string) {
    if (!imageUrl) throw new Error("Instagram requires an image URL.");
    if (!accessToken) throw new Error("Missing Instagram Access Token.");

    console.log(`📸 Posting to Instagram ID: ${instagramUserId}`);

    // 1. Create Media Container
    const containerUrl = `https://graph.facebook.com/v18.0/${instagramUserId}/media`;
    const containerParams = new URLSearchParams({
        image_url: imageUrl,
        caption: caption,
        access_token: accessToken
    });

    const containerRes = await fetch(`${containerUrl}?${containerParams}`, { method: 'POST' });
    const containerData = await containerRes.json();

    if (containerData.error) {
        console.error("❌ Instagram Container Error:", containerData.error);
        throw new Error(containerData.error.message);
    }

    const creationId = containerData.id;
    console.log(`📦 Container Created: ${creationId}`);

    // 2. Publish Container
    const publishUrl = `https://graph.facebook.com/v18.0/${instagramUserId}/media_publish`;
    const publishParams = new URLSearchParams({
        creation_id: creationId,
        access_token: accessToken
    });

    const publishRes = await fetch(`${publishUrl}?${publishParams}`, { method: 'POST' });
    const publishData = await publishRes.json();

    if (publishData.error) {
        console.error("❌ Instagram Publish Error:", publishData.error);
        throw new Error(publishData.error.message);
    }

    console.log(`✅ Published to Instagram: ${publishData.id}`);
    return publishData.id;
}
