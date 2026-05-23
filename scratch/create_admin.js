// Use native fetch (available in Node 18+)

const CLERK_SECRET_KEY = "sk_test_PqrhhrSSTKUc62I0JHo8EkuDWwkUy9WodE7GZPLD4M";

async function createAdmin() {
  console.log("Starting script to create Clerk admin user...");
  try {
    const response = await fetch("https://api.clerk.com/v1/users", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CLERK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: ["ds.marketer1@gmail.com"],
        password: "Digital@2026#",
        phone_number: ["+15555550100"],
        first_name: "Digital",
        last_name: "Admin",
        public_metadata: {
          role: "admin"
        }
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Admin user successfully created in Clerk!");
      console.log("User ID:", data.id);
      console.log("Email:", data.email_addresses[0].email_address);
    } else {
      console.error("Failed to create admin user:", data);
    }
  } catch (error) {
    console.error("Network or execution error:", error);
  }
}

createAdmin();
