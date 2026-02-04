import requests
import sys
from datetime import datetime
import json

class WhereIsMyKidAPITester:
    def __init__(self, base_url="https://parentpeace.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    result["error"] = response.json()
                except:
                    result["error"] = response.text
                print(f"Error response: {result['error']}")

            self.test_results.append(result)
            return success, result["response_data"] if success else result["error"]

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, str(e)

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_contact_lead(self):
        """Test creating a contact lead"""
        test_data = {
            "school_name": f"Test School {datetime.now().strftime('%H%M%S')}",
            "contact_person": "John Doe",
            "email": "john.doe@testschool.com",
            "phone": "+91 9876543210",
            "message": "We are interested in your school safety platform.",
            "request_type": "contact"
        }
        
        success, response = self.run_test(
            "Create Contact Lead",
            "POST",
            "leads",
            200,
            data=test_data
        )
        
        if success and isinstance(response, dict):
            # Verify response structure
            required_fields = ["id", "school_name", "contact_person", "email", "phone", "created_at"]
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
                return False, f"Missing fields: {missing_fields}"
            
            # Verify data matches
            if response["school_name"] != test_data["school_name"]:
                print(f"⚠️  Warning: School name mismatch")
                return False, "School name mismatch"
                
            return True, response
        
        return success, response

    def test_create_demo_lead(self):
        """Test creating a demo request lead"""
        test_data = {
            "school_name": f"Demo School {datetime.now().strftime('%H%M%S')}",
            "contact_person": "Jane Smith",
            "email": "jane.smith@demoschool.com",
            "phone": "+91 8765432109",
            "message": "Please schedule a demo for our school.",
            "request_type": "demo"
        }
        
        return self.run_test(
            "Create Demo Lead",
            "POST",
            "leads",
            200,
            data=test_data
        )

    def test_get_leads(self):
        """Test retrieving all leads"""
        return self.run_test("Get All Leads", "GET", "leads", 200)

    def test_invalid_lead_creation(self):
        """Test creating lead with missing required fields"""
        invalid_data = {
            "school_name": "Test School",
            # Missing required fields: contact_person, email, phone
        }
        
        return self.run_test(
            "Invalid Lead Creation",
            "POST",
            "leads",
            422,  # Validation error
            data=invalid_data
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Where Is My Kid API Tests")
        print("=" * 50)
        
        # Test API availability
        self.test_api_root()
        
        # Test lead creation
        self.test_create_contact_lead()
        self.test_create_demo_lead()
        
        # Test lead retrieval
        self.test_get_leads()
        
        # Test error handling
        self.test_invalid_lead_creation()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        # Print failed tests
        failed_tests = [test for test in self.test_results if not test["success"]]
        if failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"  - {test['test_name']}: {test['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = WhereIsMyKidAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())