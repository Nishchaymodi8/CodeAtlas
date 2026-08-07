from ollama import embed


def generate_embedding(text: str):
    response = embed(
        model="nomic-embed-text",
        input=text,
    )

    return response["embeddings"][0]