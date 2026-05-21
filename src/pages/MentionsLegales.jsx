const MentionsLegales = () => {
  return (
    <>
      <style>{`
        .legal-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
        }

        .legal-hero {
          background: #111827;
          padding: 40px 32px;
        }

        .legal-hero-inner { max-width: 860px; margin: 0 auto; }

        .legal-hero-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #16a34a;
          margin-bottom: 8px;
        }

        .legal-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem;
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1;
        }

        .legal-hero-sub {
          font-size: 0.82rem;
          color: #6b7280;
          margin-top: 10px;
        }

        .legal-body {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 32px 64px;
        }

        .legal-section {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 28px 32px;
          margin-bottom: 20px;
        }

        .legal-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.08em;
          color: #111827;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1.5px solid #f3f4f6;
        }

        .legal-row {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
          color: #374151;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .legal-row-label {
          font-weight: 600;
          color: #111827;
          min-width: 160px;
          flex-shrink: 0;
        }

        .legal-placeholder {
          display: inline-block;
          background: #fef9c3;
          border: 1px solid #fde68a;
          border-radius: 4px;
          padding: 0 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #92400e;
          font-family: 'DM Sans', sans-serif;
        }

        .legal-p {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.7;
          margin-bottom: 10px;
        }

        .legal-p:last-child { margin-bottom: 0; }

        @media (max-width: 768px) {
          .legal-hero { padding: 32px 20px; }
          .legal-body { padding: 32px 20px 48px; }
          .legal-section { padding: 20px 20px; }
          .legal-row { flex-direction: column; gap: 2px; }
          .legal-row-label { min-width: unset; }
        }
      `}</style>

      <div className="legal-root">
        <div className="legal-hero">
          <div className="legal-hero-inner">
            <p className="legal-hero-label">Informations légales</p>
            <h1 className="legal-hero-title">Mentions légales</h1>
            <p className="legal-hero-sub">Dernière mise à jour : <span className="legal-placeholder">[DATE_MAJ]</span></p>
          </div>
        </div>

        <div className="legal-body">

          {/* Éditeur */}
          <div className="legal-section">
            <p className="legal-section-title">Éditeur du site</p>
            <div className="legal-row"><span className="legal-row-label">Raison sociale</span><span><span className="legal-placeholder">[NOM_ENTREPRISE]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">Forme juridique</span><span><span className="legal-placeholder">[FORME_JURIDIQUE]</span> au capital de <span className="legal-placeholder">[CAPITAL_SOCIAL]</span> €</span></div>
            <div className="legal-row"><span className="legal-row-label">Siège social</span><span><span className="legal-placeholder">[ADRESSE_SIEGE]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">N° RCS / SIREN</span><span><span className="legal-placeholder">[NUMERO_RCS]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">N° TVA intracommunautaire</span><span><span className="legal-placeholder">[NUMERO_TVA]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">Directeur de publication</span><span><span className="legal-placeholder">[NOM_DIRECTEUR]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">Email de contact</span><span><span className="legal-placeholder">[EMAIL_CONTACT]</span></span></div>
          </div>

          {/* Hébergeur */}
          <div className="legal-section">
            <p className="legal-section-title">Hébergeur</p>
            <div className="legal-row"><span className="legal-row-label">Société</span><span><span className="legal-placeholder">[NOM_HÉBERGEUR]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">Adresse</span><span><span className="legal-placeholder">[ADRESSE_HÉBERGEUR]</span></span></div>
            <div className="legal-row"><span className="legal-row-label">Site web</span><span><span className="legal-placeholder">[SITE_HÉBERGEUR]</span></span></div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="legal-section">
            <p className="legal-section-title">Propriété intellectuelle</p>
            <p className="legal-p">L'ensemble des éléments constituant le site <strong>FTK Merch</strong> (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de <span className="legal-placeholder">[NOM_ENTREPRISE]</span>, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.</p>
            <p className="legal-p">Toute reproduction, représentation, modification, publication, adaptation totale ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de <span className="legal-placeholder">[NOM_ENTREPRISE]</span>.</p>
          </div>

          {/* Responsabilité */}
          <div className="legal-section">
            <p className="legal-section-title">Limitation de responsabilité</p>
            <p className="legal-p"><span className="legal-placeholder">[NOM_ENTREPRISE]</span> ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au site, résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques, soit de l'apparition d'un bug ou d'une incompatibilité.</p>
            <p className="legal-p"><span className="legal-placeholder">[NOM_ENTREPRISE]</span> ne pourra également être tenu responsable des dommages indirects consécutifs à l'utilisation du site.</p>
          </div>

          {/* Droit applicable */}
          <div className="legal-section">
            <p className="legal-section-title">Droit applicable et juridiction</p>
            <p className="legal-p">Tout litige en relation avec l'utilisation du site <strong>FTK Merch</strong> est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default MentionsLegales;
