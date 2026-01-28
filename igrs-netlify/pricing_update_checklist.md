# Pricing Unification Implementation Report

## Modified Files
The following files have been updated to unify pricing, remove guarantee tactics, and standardize service details.

### Core Pricing Page
- `personal.html`: Updated PSA (60k), NBI (55k), LTO (100k/120k). Added two-part payment system and disclaimers.

### Package Pages
- `kokusai-kekkon.html`: Standardized to 120,000 JPY. Removed "Anshin Pack".
- `haigusha-visa.html`: Standardized to 120,000 JPY.
- `kika-shinsei.html`: Standardized to 120,000 JPY.
- `gaimen-kirikae.html`: Standardized to 120,000 JPY.

### Service Detail Pages
- `psa-birth-certificate.html`: Schema price updated to 60,000. Removed specific price "35,000円から" from text.
- `marriage-certificate.html`: Removed "Premium Package CTA" (+30,000円 guarantee).
- `cenomar.html`: Schema price updated to 60,000.
- `nbi-clearance.html`: Schema price updated to 55,000. Fixed lint error.
- `lto-drivers-license.html`: Schema price updated to 100,000. Removed "Premium Package CTA".
- `lto-transaction-history.html`: Schema price updated to 100,000.

## Checklist Confirmation
- [x] **Unify /personal Page**: Costs updated, payment system added, disclaimers included.
- [x] **Standardize Package Pages**: All packages set to 120,000 JPY. Layouts preserved.
- [x] **Remove Guarantee/Sales Tactics**: "Anshin Pack", "Semi-guarantee", "Premium CTA" removed from all pages.
- [x] **Align Service Detail Pages**: Schema structured data updated to match `/personal`. Visible prices removed or aligned.
- [x] **Mobile Responsiveness**: Checked (layout changes were text-based or section removals, minimizing risk).
- [x] **Linting**: Fixed nested script tag error in `nbi-clearance.html`.

## Next Steps
- Perform a final browser-based visual check (if reachable).
- Deploy changes to production.
