import { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  MenuItem,
  Card,
  CardContent,
  Snackbar,
  Alert, // ✅ added
} from "@mui/material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("formal");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false); // ✅ copy state

  const handleGenerate = async () => {
    if (emailContent.trim() === "") {
      alert("Please enter some email content before generating a reply.");
      return;
    }

    setLoading(true);
    setCopied(false);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );

      setReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error("Error generating reply:", error);
      let generated = "";
      switch (tone) {
        case "formal":
          generated = `Dear Sir/Madam,\n\nThank you for reaching out. I will get back to you soon.\n\nRegards,\nYour Assistant\n\n(Your email: ${emailContent})`;
          break;
        case "casual":
          generated = `Hey! Thanks for your email 😊 I'll reply soon.\n\nYour message: ${emailContent}`;
          break;
        case "short":
          generated = `Got your email, will respond soon!`;
          break;
        case "detailed":
          generated = `Thank you for your detailed message. I truly appreciate the time you took to explain everything. I’ll carefully review your points and provide you with a proper response very soon.\n\nYour message: ${emailContent}`;
          break;
        case "professional": // ✅ added professional tone
          generated = `Hello,\n\nThank you for your message. I appreciate your communication and will review it thoroughly before providing you with a thoughtful response.\n\nBest regards,\nYour Assistant\n\n(Your email: ${emailContent})`;
          break;
        default:
          generated = "Reply could not be generated.";
      }
      setReply(generated);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Copy function
  const handleCopy = () => {
    if (reply) {
      navigator.clipboard.writeText(reply);
      setCopied(true); // trigger Snackbar
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              AI Email Writer
            </Typography>

            <TextField
              label="Enter your email content"
              fullWidth
              multiline
              rows={4}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Select Tone"
              fullWidth
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="short">Short</MenuItem>
              <MenuItem value="detailed">Detailed</MenuItem>
              <MenuItem value="professional">Professional</MenuItem> {/* ✅ added */}
            </TextField>

            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerate}
              disabled={loading}
              sx={{ py: 1.5, fontSize: "16px" }}
            >
              {loading ? "Generating..." : "Generate Reply"}
            </Button>

            {reply && (
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Generated Reply:
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#f0f4ff",
                    p: 2,
                    borderRadius: 2,
                    whiteSpace: "pre-line",
                    boxShadow: 1,
                  }}
                >
                  {reply}
                </Box>

                {/* ✅ Copy button */}
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCopy}
                  sx={{ mt: 2 }}
                >
                  Copy Reply
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Reply copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
