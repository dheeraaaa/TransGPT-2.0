from deep_translator import GoogleTranslator

def translate_text(text, source, target):
    return GoogleTranslator(
        source=source,
        target=target
    ).translate(text)