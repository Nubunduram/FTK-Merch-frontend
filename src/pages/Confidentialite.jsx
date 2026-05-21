const Confidentialite = () => {
  return (
    <>
      <style>{`
        .conf-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
        }

        .conf-hero {
          background: #111827;
          padding: 40px 32px;
        }

        .conf-hero-inner { max-width: 860px; margin: 0 auto; }

        .conf-hero-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #16a34a;
          margin-bottom: 8px;
        }

        .conf-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1;
        }

        .conf-hero-sub {
          font-size: 0.82rem;
          color: #6b7280;
          margin-top: 10px;
        }

        .conf-body {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 32px 64px;
        }

        .conf-section {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 28px 32px;
          margin-bottom: 20px;
        }

        .conf-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.08em;
          color: #111827;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1.5px solid #f3f4f6;
        }

        .conf-p {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.7;
          margin-bottom: 10px;
        }

        .conf-p:last-child { margin-bottom: 0; }

        .conf-list {
          list-style: none;
          padding: 0;
          margin: 0 0 10px;
        }

        .conf-list li {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.7;
          padding-left: 16px;
          position: relative;
        }

        .conf-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #16a34a;
          font-size: 0.75rem;
        }

        .conf-placeholder {
          display: inline-block;
          background: #fef9c3;
          border: 1px solid #fde68a;
          border-radius: 4px;
          padding: 0 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #92400e;
        }

        .conf-highlight {
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 10px;
          padding: 16px 20px;
          font-size: 0.85rem;
          color: #15803d;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .conf-hero { padding: 32px 20px; }
          .conf-body { padding: 32px 20px 48px; }
          .conf-section { padding: 20px 20px; }
        }
      `}</style>

      <div className="conf-root">
        <div className="conf-hero">
          <div className="conf-hero-inner">
            <p className="conf-hero-label">Vos droits</p>
            <h1 className="conf-hero-title">Politique de confidentialité</h1>
            <p className="conf-hero-sub">Dernière mise à jour : <span className="conf-placeholder">[DATE_MAJ]</span></p>
          </div>
        </div>

        <div className="conf-body">

          {/* Intro */}
          <div className="conf-section">
            <p className="conf-section-title">Introduction</p>
            <div className="conf-highlight">
              Chez FTK Merch, la protection de vos données personnelles est une priorité. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
            </div>
            <p className="conf-p">Le responsable du traitement est : <span className="conf-placeholder">[NOM_ENTREPRISE]</span>, dont le siège est situé <span className="conf-placeholder">[ADRESSE_SIEGE]</span>. Pour toute question : <span className="conf-placeholder">[EMAIL_DPO_OU_CONTACT]</span>.</p>
          </div>

          {/* Données collectées */}
          <div className="conf-section">
            <p className="conf-section-title">Données collectées</p>
            <p className="conf-p">Nous collectons uniquement les données nécessaires au fonctionnement de nos services :</p>
            <ul className="conf-list">
              <li><strong>Données d'identité :</strong> prénom, nom</li>
              <li><strong>Données de contact :</strong> adresse email</li>
              <li><strong>Données de livraison :</strong> adresse postale</li>
              <li><strong>Données de commande :</strong> historique d'achats, montants</li>
              <li><strong>Données de connexion :</strong> token d'authentification (stocké localement)</li>
            </ul>
            <p className="conf-p">Nous ne collectons pas de données bancaires — le paiement est géré par <span className="conf-placeholder">[NOM_PRESTATAIRE_PAIEMENT]</span> (ex: Stripe).</p>
          </div>

          {/* Finalités */}
          <div className="conf-section">
            <p className="conf-section-title">Finalités et bases légales</p>
            <ul className="conf-list">
              <li><strong>Exécution du contrat :</strong> gestion des commandes, livraisons, facturation</li>
              <li><strong>Intérêt légitime :</strong> amélioration de nos services, sécurité du site</li>
              <li><strong>Obligation légale :</strong> conservation des données de facturation (10 ans)</li>
              <li><strong>Consentement :</strong> communications marketing (si vous vous y êtes inscrit)</li>
            </ul>
          </div>

          {/* Conservation */}
          <div className="conf-section">
            <p className="conf-section-title">Durée de conservation</p>
            <ul className="conf-list">
              <li><strong>Données de compte :</strong> durée d'existence du compte + <span className="conf-placeholder">[DURÉE]</span> après suppression</li>
              <li><strong>Données de commande :</strong> 10 ans (obligation comptable)</li>
              <li><strong>Données de connexion :</strong> <span className="conf-placeholder">[DURÉE]</span></li>
            </ul>
          </div>

          {/* Vos droits RGPD */}
          <div className="conf-section">
            <p className="conf-section-title">Vos droits (RGPD)</p>
            <p className="conf-p">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="conf-list">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données (disponible dans votre profil)</li>
              <li><strong>Droit à l'effacement :</strong> supprimer votre compte et vos données (disponible dans votre profil)</li>
              <li><strong>Droit de rectification :</strong> modifier vos informations personnelles (disponible dans votre profil)</li>
              <li><strong>Droit à la portabilité :</strong> exporter vos données au format JSON (disponible dans votre profil)</li>
              <li><strong>Droit d'opposition :</strong> s'opposer à certains traitements</li>
            </ul>
            <p className="conf-p">Pour exercer ces droits, rendez-vous dans votre <strong>espace profil → onglet Données & Confidentialité</strong>, ou contactez-nous à <span className="conf-placeholder">[EMAIL_DPO_OU_CONTACT]</span>.</p>
            <p className="conf-p">En cas de réclamation, vous pouvez contacter la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a" }}>www.cnil.fr</a>.</p>
          </div>

          {/* Sécurité */}
          <div className="conf-section">
            <p className="conf-section-title">Sécurité des données</p>
            <p className="conf-p">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement des mots de passe (bcrypt), communications sécurisées (HTTPS), accès restreint aux données.</p>
          </div>

          {/* Cookies */}
          <div className="conf-section">
            <p className="conf-section-title">Cookies</p>
            <p className="conf-p">Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement (authentification). Aucun cookie publicitaire ou de tracking tiers n'est utilisé à ce jour.</p>
            <p className="conf-p">Si cette politique venait à évoluer, un bandeau de consentement vous en informerait.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Confidentialite;
