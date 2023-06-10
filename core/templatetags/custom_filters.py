from django import template
import locale

register = template.Library()

@register.filter
def add_thousands_separator(value):
    return locale.format_string("%d", value, grouping=True)

@register.filter
def convert_to_float(value):
    try:
        return float(value)
    except (ValueError, TypeError):
        return value