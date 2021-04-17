PROMTABLE_EXAMPLES = {
'DecreaseBrightness': """
Intent: DecreaseBrightness
Available slots: room
2 Utterances:
- Turn down the lights in the [kitchen](room)
- Decrease the lighting in the [bedroom](room)
""",

'GetWeather': """
Intent: GetWeather
Available slots: country, city, state
3 Utterances:
- Tell me the weather forecast for [Canada](country)
- Will there be wind in [Palo Alto](city), [California](state)
- What is the weather forecast
""",

'ContactSales': """
Intent: ContactSales
Available slots: name
3 Utterances:
- i'd like to call [Johnnie Essig](name)
- I wanna talk to your sales guy
- I would like to have a demo scheduled
""",
}

PROMPT_INIT = """
Intent: {intent}
Available slots: {slots}
{n} Utterances:
""".strip('\n')

OPTIONAL_EXAMPLE = "\n- {example}\n-"