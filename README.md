# Masked Column PCF Control

A Power Apps Component Framework (PCF) control that provides secure input functionality with toggle visibility for sensitive data like passwords, confidential information, or any data that needs to be masked while typing.

## Features

🔐 **Secure Input with Masking**
- Hide sensitive data while typing with customizable mask characters
- Toggle visibility on/off with eye icon button
- Real-time masking as user types

🎯 **Flexible Masking Patterns**
- Custom regex patterns to specify which characters to mask
- Default masking for all characters when no pattern specified

🎨 **Customizable Appearance**
- Choose your preferred mask character (*, •, -, #, X, etc.)
- Responsive design that works across forms

🔄 **Smart Interaction**
- Automatic visibility toggle based on content (empty columns show unmasked by default)
- Maintains actual data value while displaying masked version
- Seamless editing experience in both masked and unmasked states

## Configuration

The control can be configured through the Power Apps interface when adding it to a form column. Below are the available configuration options.

### Configuration Parameters

| Parameter | Display Name | Type | Description | Default | Required |
|:---|:---|:---|:---|:---|:---|
| `maskedColumn` | Data Input | Text | The column containing the data to be masked/unmasked | - | ✅ |
| `regexColumn` | Mask Pattern (Regex) | Text | Optional regex pattern to specify which characters to mask | `/./g` | ❌ |
| `maskCharColumn` | Mask Character | Text | The character to use for masking | `•` | ❌ |

### Regex Pattern Examples

| Pattern | Description | Example Input | Masked Output |
|:---|:---|:---|:---|
| `/./g` | Mask all characters (default) | `MyPassword123` | `•••••••••••••` |
| `/[a-zA-Z]/g` | Mask letters only | `MyPassword123` | `••••••••••123` |
| `/[0-9]/g` | Mask numbers only | `MyPassword123` | `MyPassword•••` |
| `/[A-Z]/g` | Mask uppercase letters only | `MyPassword123` | `•yPassword123` |
| `/[a-z]/g` | Mask lowercase letters only | `M•••••••••123` | `MyPassword123` |

### Mask Character Options

Choose from various mask characters to suit your design preferences:

- `•` (bullet) - Default, clean appearance
- `*` (asterisk) - Classic password masking
- `-` (dash) - Subtle masking
- `#` (hash) - Bold masking
- `X` (letter X) - Clear masking indication
- Or any single character of your choice

## Use Cases

### 🔑 Password Columns
Perfect for password input columns in registration forms, login screens, or user profile updates.

### 📄 Confidential Information
Mask sensitive business data, personal identification numbers, or confidential codes.

### 💳 Financial Data
Hide credit card numbers, bank account information, or financial codes while maintaining usability.

### 📱 Personal Data
Protect phone numbers, email addresses, or other PII in data entry forms.

## Installation

Choose one of the following deployment options:

### Option 1: Deploy from Source Code
Deploy the component directly from the 💻 source code by following these steps:

#### Prerequisites
- [Node.js](https://nodejs.org/) (18.x or higher)
- [Microsoft Power Platform CLI](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli)

#### Deployment Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/shamak1/masked-column-pcf-control.git
   cd masked-column-pcf-control
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the component:
   ```bash
   npm run build
   ```

4. Authenticate with your Power Platform environment:
   ```bash
   pac auth create --environment "https://your-environment.crm.dynamics.com/"
   ```
   > Replace `https://your-environment.crm.dynamics.com/` with your actual Power Platform environment URL

5. Push the component to your environment:
   ```bash
   pac pcf push --publisher-prefix "YOUR_PREFIX"
   ```
   > Replace `YOUR_PREFIX` with your organization's publisher prefix

For detailed guidance on deploying Power Apps Component Framework components, refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/import-custom-controls#deploying-code-components).

## Usage

### Basic Setup
1. Add the control to any **Single Line of Text** column in your Power Apps form
2. The control will automatically mask all characters by default
3. Users can toggle visibility using the eye icon button

### Advanced Configuration
1. **Custom Mask Pattern**: Set a regex pattern to mask only specific characters
   ```
   Mask Pattern: /[0-9]/g
   ```
   This will mask only numbers, leaving letters visible

2. **Custom Mask Character**: Choose your preferred masking character
   ```
   Mask Character: *
   ```

3. **Complete Example**: Mask only letters with asterisks
   ```
   Mask Pattern: /[a-zA-Z]/g
   Mask Character: *
   ```

## How It Works

### Masking Logic
- **Initial State**: Empty columns start unmasked for better user experience
- **User Interaction**: Once user starts typing or toggles visibility, the component remembers the preference
- **Real-time Masking**: Characters are masked as they match the specified regex pattern
- **Data Integrity**: The actual value is always preserved, only the display is masked

### Toggle Behavior
- **Eye Icon**: Click to show/hide content
- **Smart Defaults**: Empty columns show unmasked, populated columns start masked
- **State Persistence**: Toggle preference is maintained during the session


## Security Considerations

> [!WARNING]
> **Client-Side Masking**: This control provides UI-level masking for user experience. It does not provide server-side security.

- The actual data value is stored in browser memory during editing
- Masking is visual only - data is not encrypted
