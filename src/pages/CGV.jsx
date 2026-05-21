const CGV = () => {
  return (
    <>
      <style>{`
        .cgv-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
        }

        .cgv-hero {
          background: #111827;
          padding: 40px 32px;
        }

        .cgv-hero-inner { max-width: 860px; margin: 0 auto; }

        .cgv-hero-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #16a34a;
          margin-bottom: 8px;
        }

        .cgv-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1;
        }

        .cgv-hero-sub {
          font-size: 0.82rem;
          color: #6b7280;
          margin-top: 10px;
        }

        .cgv-body {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 32px 64px;
        }

        .cgv-section {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 28px 32px;
          margin-bottom: 20px;
        }

        .cgv-section-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #16a34a;
          color: #fff;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .cgv-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.08em;
          color: #111827;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1.5px solid #f3f4f6;
          display: flex;
          align-items: center;
        }

        .cgv-p {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.7;
          margin-bottom: 10px;
        }

        .cgv-p:last-child { margin-bottom: 0; }

        .cgv-list {
          list-style: none;
          padding: 0;
          margin: 0 0 10px;
        }

        .cgv-list li {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.7;
          padding-left: 16px;
          position: relative;
        }

        .cgv-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #16a34a;
          font-size: 0.75rem;
        }

        .cgv-placeholder {
          display: inline-block;
          background: #fef9c3;
          border: 1px solid #fde68a;
          border-radius: 4px;
          padding: 0 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #92400e;
        }

        @media (max-width: 768px) {
          .cgv-hero { padding: 32px 20px; }
          .cgv-body { padding: 32px 20px 48px; }
          .cgv-section { padding: 20px 20px; }
        }
      `}</style>

      <div className="cgv-root">
        <div className="cgv-hero">
          <div className="cgv-hero-inner">
            <p className="cgv-hero-label">Achat en ligne</p>
            <h1 className="cgv-hero-title">Conditions générales de vente</h1>
            <p className="cgv-hero-sub">Dernière mise à jour : <span className="cgv-placeholder">[DATE_MAJ]</span></p>
          </div>
        </div>

        <div className="cgv-body">

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">1</span>Objet</p>
            <p className="cgv-p">Les présentes conditions générales de vente régissent les ventes de produits effectuées par <span className="cgv-placeholder">[NOM_ENTREPRISE]</span> (ci-après « le Vendeur ») sur le site <strong>FTK Merch</strong>, auprès de tout consommateur (ci-après « l'Acheteur »).</p>
            <p className="cgv-p">Tout achat effectué sur le site implique l'acceptation sans réserve des présentes CGV.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">2</span>Produits</p>
            <p className="cgv-p">Les produits proposés sont ceux figurant dans le catalogue en ligne. Chaque produit est présenté avec une description, une photo et un prix TTC.</p>
            <p className="cgv-p">Le Vendeur se réserve le droit de modifier à tout moment l'assortiment de produits. En cas d'indisponibilité d'un produit après commande, l'Acheteur en sera informé dans les meilleurs délais.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">3</span>Prix</p>
            <p className="cgv-p">Les prix sont indiqués en euros TTC. Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l'Acheteur.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">4</span>Commande</p>
            <p className="cgv-p">La commande est validée par l'Acheteur après vérification du contenu de son panier et confirmation du paiement. Un email de confirmation est envoyé à l'adresse fournie lors de l'inscription.</p>
            <p className="cgv-p">Le Vendeur se réserve le droit d'annuler ou de refuser toute commande en cas de litige existant ou de suspicion de fraude.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">5</span>Paiement</p>
            <p className="cgv-p">Le paiement est exigible à la commande. Il peut être effectué par les moyens suivants :</p>
            <ul className="cgv-list">
              <li>Carte bancaire (Visa, Mastercard) via <span className="cgv-placeholder">[NOM_PRESTATAIRE_PAIEMENT]</span></li>
            </ul>
            <p className="cgv-p">Les données bancaires sont chiffrées et traitées par notre prestataire de paiement sécurisé. Le Vendeur n'a accès à aucune donnée bancaire.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">6</span>Livraison</p>
            <p className="cgv-p">Les livraisons sont effectuées à l'adresse indiquée lors de la commande, en France métropolitaine.</p>
            <ul className="cgv-list">
              <li>Frais de livraison : <span className="cgv-placeholder">[PRIX_LIVRAISON]</span> (offerts dès 60 € d'achat)</li>
              <li>Délai estimé : <span className="cgv-placeholder">[DELAI_LIVRAISON]</span> jours ouvrés</li>
            </ul>
            <p className="cgv-p">En cas de retard de livraison, l'Acheteur peut contacter le service client à <span className="cgv-placeholder">[EMAIL_CONTACT]</span>.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">7</span>Droit de rétractation</p>
            <p className="cgv-p">Conformément aux articles L221-18 et suivants du Code de la consommation, l'Acheteur dispose d'un délai de <strong><span className="cgv-placeholder">[DELAI_RETRACTATION]</span> jours</strong> à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.</p>
            <p className="cgv-p">Les produits doivent être retournés dans leur état d'origine, non portés, non lavés, avec leurs étiquettes. Les frais de retour sont à la charge de <span className="cgv-placeholder">[VENDEUR_OU_ACHETEUR]</span>.</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">8</span>Garanties</p>
            <p className="cgv-p">Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).</p>
          </div>

          <div className="cgv-section">
            <p className="cgv-section-title"><span className="cgv-section-num">9</span>Droit applicable</p>
            <p className="cgv-p">Les présentes CGV sont soumises au droit français. En cas de litige, les parties rechercheront une solution amiable avant toute action judiciaire. À défaut, le litige sera soumis aux tribunaux compétents français.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default CGV;
