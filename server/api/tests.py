'''
Added some tests to debug functionality
'''
from django.test import TestCase
from django.test import TestCase, Client
from django.urls import reverse
import json

class HealthCheckTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_health_check(self):
        response = self.client.post(reverse('health-check'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "pong"})

class DocumentAnalysisTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('document-analysis')
        self.text_body = (
            "Confidentiality Agreement This Confidentiality Agreement "
            "('Agreement') is made and entered into as of the ___ day of ___, "
            "2024 ('Effective Date'), by and between ABC Corporation, a Delaware "
            "corporation with its principal place of business at 123 Main Street, "
            "Anytown, USA ('Disclosing Party'), and XYZ Inc, a California corporation "
            "with its principal place of business at 456 Elm Street, Othertown, USA "
            "('Receiving Party'). Definition of Confidential Information. For purposes "
            "of this Agreement, 'Confidential Information' means all non-public, confidential, "
            "or proprietary information disclosed by the Disclosing Party to the Receiving Party, "
            "whether disclosed orally or in writing, that is designated as confidential or that "
            "reasonably should be understood to be confidential given the nature of the information "
            "and the circumstances of disclosure. Confidential Information includes, but is not limited "
            "to, business plans, technical data, trade secrets, know-how, research and development, product "
            "plans, products, services, customer lists, and financial information."
        )

    def test_document_analysis_top_words(self):
        payload = {
            "text_body": self.text_body,
            "keyword_macros": ["confidential"],
            "analysis_type": "top_words"
        }
        response = self.client.post(self.url, json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        expected_response = [{
            "keyword_macro": "confidential",
            "analysis_type": "top_words",
            "value": ["information", "party", "agreement"]
        }]
        self.assertEqual(response.json(), expected_response)

    def test_document_analysis_invalid_analysis_type(self):
        payload = {
            "text_body": self.text_body,
            "keyword_macros": ["confidential"],
            "analysis_type": "invalid_type"
        }
        response = self.client.post(self.url, json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Unsupported analysis type"})
