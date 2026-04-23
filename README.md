# Auth_TS


## Problem Statement Backend: Build a proper login authentication using JWT token, and there should be 4 roles and based on role there should be message. roles can be super admin, admin, teacher, student.



```json

{
users:{
    _id:mongooseID(),
    name:string,
    email:string,
    password:string,
    role:["superadmin","admin","teacher","student"],
    isVerified:boolean,
    timestamp:automatic by mongoose,
    // verificationToken:string, -> mail verification
    refreshToken:stirng, -> jwt token for the stateless auth
    // resetPasswordtoken: string, -> 
    // resetpasswordExpires:string, ->
}

}

```
### taking idea about user schema now try to write its use


verication token : use to verification a user by mail (one send to mail and one is token to a user mail)

## Email Deliverability (Resend)

If you see bounces like `Generic Temporary Delivery Failure`, verify sender identity and DNS records.

### Sender address

- Use a real mailbox sender, not `no-reply`.
- Recommended sender in this project: `auth@gouravindoriya.live`

### Required DNS records

For domain `gouravindoriya.live` configure all of these:

1. SPF (TXT)
- Host: `@`
- Value:

```txt
v=spf1 include:amazonses.com ~all
```

2. DKIM (CNAME)
- Add DKIM CNAME records exactly from your Resend domain dashboard.

3. DMARC (TXT)
- Host: `_dmarc`
- Value:

```txt
v=DMARC1; p=none; rua=mailto:dmarc@gouravindoriya.live; ruf=mailto:dmarc@gouravindoriya.live; fo=1; adkim=s; aspf=s; pct=100
```

After monitoring reports and fixing alignment issues, increase policy:

- `p=quarantine`
- `p=reject`

### Important checks

- Confirm your sending domain is verified in Resend.
- Keep `from` domain aligned with SPF/DKIM/DMARC domain.
- Wait for DNS propagation before re-testing.

# Todo
